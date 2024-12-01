import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductAppStack extends cdk.Stack {
  readonly productsFetchHanlder: lambdaNodejs.NodejsFunction;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  this.productsFetchHanlder = new lambdaNodejs.NodejsFunction(this,
    'productsFetchHanlder',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        functionName: 'productsFetchHanlder',
        entry: 'lambda/products/productsFetchHanlder.ts',
        handler: 'handler',
        memorySize: 512,
        timeout: cdk.Duration.seconds(5),
        bundling: {
          minify: true,
          sourceMap: false,
        }
      }
    )
  }
}