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
        TableName: "alexandria-db",
        Key: {
          category: book.category,
          title: book.title,
        },
      })
    );

    if (checkExists.Item == null) {
      await docClient.send(
        new PutCommand({
          TableName: "alexandria-db",
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
