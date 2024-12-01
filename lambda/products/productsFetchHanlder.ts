import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function hanlder(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const resource = event.resource;
  const method = event.httpMethod;

  const lambdaRequestId = context.awsRequestId
  const apiRequestId = event.requestContext.requestId

  console.log(`Lambda Request ID: ${lambdaRequestId} - API Request ID: ${apiRequestId}`);

  if(resource === '/products') {
    if(method === 'GET') {
      console.log('GET /products');

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'GET /products'
        })
      }
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Bad Request'
    })
  }
}