import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import booksData from './books'; // Assuming the book data is stored in a JSON file named "books.json"

interface Book {
  type: string;
  category: string;
  title: string;
  author: string;
  pageCount: number;
  price: number;
  publicationDate: string;
  thumbnail: string;
  stock: number;
}

async function seedDatabase() {
  const client = new DynamoDBClient({ region: 'eu-west-1' }); // Replace with your desired region

  // Assuming the book data is stored in a JSON file named "books.json"
  const bookData: Book[] = booksData;

  // Iterate through the array of books and add them to the DynamoDB table
  for (const book of bookData) {
    const params = {
      TableName: 'alexandria-api',
      Item: marshall(book),
    };

    await client.send(new PutItemCommand(params));
  }
}

seedDatabase().catch((error) => {
  console.error(error);
});
