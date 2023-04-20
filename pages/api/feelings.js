import clientPromise from '../../utils/mongo';


async function getFeelings(){
  try {
    const client = await clientPromise;
    const db = client.db("headflow");
  
    const feelings = await db
      .collection("feelings")
      .find({})
      .sort({ _id: -1 })
      .limit(48)
      .toArray();
  
      // console.log( {
      //     props: { movies: JSON.parse(JSON.stringify(movies)) },
      // }) 
    return feelings;
  } catch (e) {
      console.error(e);
  }
}

async function addFeeling(title, level, date){
  try {
    const client = await clientPromise;
    const db = client.db("headflow");

    const resp = await db
      .collection("goals")
      .insertOne({
        title: title,
        level: level,
        date: date ? date : new Date.now()
      })

    return JSON.parse(JSON.stringify(resp));
  } catch (e) {
      console.error(e);
  }
}

export default async function handler(req,res){
  if (req.method === 'POST') {
    const { title, level, date } = req.body.params;
    const resp = await addFeeling(title, level, date);
    return res.status(200).json(resp);
  } else {
    try {
      const resp = await getFeelings();
      return res.status(200).json(resp);
    } catch(e){
      return res.status(400).json(resp);
    }
  }
}
