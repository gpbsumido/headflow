import clientPromise from '../../utils/mongo';
import {ObjectId} from 'mongodb';


async function getTasks(){
  try {
    const client = await clientPromise;
    const db = client.db("headflow");
  
    const movies = await db
      .collection("tasks")
      .find({})
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

async function addTask(goalId,title){
  try {
    const client = await clientPromise;

    const transactionOptions = {
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' },
      readPreference: 'primary'
    };

    let response = {};
    let newTask = {};
    const db = client.db("headflow");
    const session = client.startSession();

    try {
      session.startTransaction(transactionOptions);

      newTask = await db
        .collection("tasks")
        .insertOne({
            title: title,
            tasks: [],
          },
          { session }
        );

      console.log(newTask);
      console.log(newTask.insertedId);
      
      //if (tasksCollection.acknowledged) {
        response = await db
          .collection("goals")
          .updateOne(
            { _id: new ObjectId(goalId) },
            {
              $set: {
                updated_at: Date.now(),
              },
              $push: {
                tasks: newTask.insertedId
              },
            },
            { }
          );
      //}
        
      await session.commitTransaction();
      console.log('Transaction successfully committed.');
    } catch (error) {
      if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
        // add your logic to retry or handle the error
      }
      else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
        // add your logic to retry or handle the error
      } else {
        console.log('An error occured in the transaction, performing a data rollback:' + error);
      }
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }


    return JSON.parse(JSON.stringify(newTask));

    // console.log( {
    //     props: { movies: JSON.parse(JSON.stringify(movies)) },
    // })
  } catch (e) {
      console.error(e);
  }
}

export default async function handler(req,res){
  if (req.method === 'POST') {
    const { title, goalId } = req.body.params;
    const resp = await addTask(goalId,title);
    return res.status(200).json(resp);
  } else {
    try {
      const resp = await getTasks();
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
