#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { ProductAppStack } from '../lib/productApp-stack';
import { EcommerceApiStack } from '../lib/ecommerceApi-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: "168359302610",
  region: "us-east-1"
}

const tags = {
  cost: "ECommerce",
  team: "gabrielcaiana"
}

const productsAppStack = new ProductAppStack(app, 'ProductAppStack', { 
  env,
  tags 
});

const ecommerceApiStack = new EcommerceApiStack(app, 'EcommerceApiStack', {
  productsFetchHandler: productsAppStack.productsFetchHanlder,
  env,
  tags
});

ecommerceApiStack.addDependency(productsAppStack);