// track the searches made by the user
import { Account, Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const database = new Databases(client);


export const updateSearchCount = async (query: string , movie: Movie) => {
    try {
      console.log("updateSearchCount called with:", query, movie?.title);

    const result = await database.listDocuments(DATABASE_ID, TABLE_ID,[
        Query.equal('searchTerm', query)
    ])

    console.log("Appwrite query result:", JSON.stringify(result, null, 2))
  // check if a record of that search has been stored 
  if(result.documents.length > 0 ){
    const existingMovie = result.documents[0];
    console.log("Found existing record, updating:", existingMovie);

    await database.updateDocument(
        DATABASE_ID, 
        TABLE_ID, 
        existingMovie.$id,
        {
            count: existingMovie.count + 1
        }
    )
    console.log("Document updated successfully");
  } else {
    console.log("No existing record, creating new one...");
    await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(),{
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    })
    console.log("New document created successfully");
  }
} catch(error){
  console.log("Error in updateSearchCount:", error);
  throw error;
}
  // if a document is found increment the searchCount field
  // if no document is found 
       // create a new document in Appwrite database  -> 1
} 

export const getTrendingMovie = async (): Promise< TrendingMovie[] | undefined > => {
      try {
           const result = await database.listDocuments(
            DATABASE_ID, 
            TABLE_ID, [
              Query.limit(5),
              Query.orderDesc('count'),
            ])

            return result.documents as unknown as TrendingMovie[];
      } catch (error) {
        console.log(error);
        return undefined;
      }
}