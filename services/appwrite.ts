// track the searches made by the user
import { Account, Client, Databases, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const database = new Databases(client);


export const updateSearchCount = async (query: string , movie: Movie) => {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID,[
        Query.equal('searchTerm', query)
    ])

    console.log("query result", result)
  // check if a record of that search has been stored 
  // if a document is found increment the searchCount field
  // if no document is found 
       // create a new document in Appwrite database  -> 1
} 