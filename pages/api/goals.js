import clientPromise from '../../utils/mongo';

async function getGoals(){
  try {
    const client = await clientPromise;
    const db = client.db("headflow");
  
    const movies = await db
      .collection("goals")
      .aggregate([
        {
          $lookup : {
            from : 'tasks',
            localField : 'tasks',
            foreignField : '_id',
            as : 'tasks'
          }
        }
      ])
      //.find({})
      .sort({ _id: -1 })
      .limit(20)
      .toArray();
  
      // console.log( {
      //     props: { movies: JSON.parse(JSON.stringify(movies)) },
      // }) 
    return movies;
  } catch (e) {
      console.error(e);
  }
}
async function addGoal(title){
  try {
    const client = await clientPromise;
    const db = client.db("headflow");

    const resp = await db
      .collection("goals")
      .insertOne({
        title: title,
        tasks: [],
      })

      return JSON.parse(JSON.stringify(resp));

    // console.log( {
    //     props: { movies: JSON.parse(JSON.stringify(movies)) },
    // })
  } catch (e) {
      console.error(e);
  }
}

export default async function handler(req,res){
  if (req.method === 'POST') {
    const { title } = req.body.params;
    console.log('body',req.body)
    console.log('title',title)
    const resp = await addGoal(title);
    return res.status(200).json(resp);
  } else {
    try {
      const resp = await getGoals();
      return res.status(200).json(resp);
    } catch(e){
      return res.status(400).json(resp);
    }
  }
}

async function addToList(emailList,newMemberEmail){
  try {
    const mg = getMGClient();
    return await mg.lists.members.createMember(emailList || process.env.MAILGUN_MAILING_LIST, {
      address: newMemberEmail,
      // name: newMemberName, // optional, modifiable on website
      // vars: {hobby: "chess"}, // optional, modifiable on website
      subscribed: 'yes', // optional, modifiable on website
      upsert: 'yes', // optional, choose yes to insert if not exist, or update it exist
    });
  } catch (e) {
      console.error(e);
  }
}
