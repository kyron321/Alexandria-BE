import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import books from "./books";

const dbClient = new DynamoDBClient({ region: "eu-west-1" });
const docClient = DynamoDBDocumentClient.from(dbClient);

const seedDb = async () => {
  for (const book of books) {
    console.log(book)
    const checkExists = await docClient.send(
      new GetCommand({
        TableName: "alexandria-api",
        Key: {
          title: book.title,
          category: book.category,
        },
      })
    );

    if (checkExists.Item == null) {
        console.log("You have attempted to write duplicate information into the DB, we have not put this duplicate data into the DB.")
      await docClient.send(
        new PutCommand({
          TableName: "alexandria-api",
          Item: book,
        })
      );
    }
  }
};

(async () => {
  await seedDb();
  console.log("Database has been seeded! :)")
})();
