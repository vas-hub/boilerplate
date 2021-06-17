set -e

echo "building on: "$BRANCH

# install workspace-wide dependencies
yarn 

# compile packages
yarn compile

if [ "$BRANCH" = "release" ] ; then
  yarn build:staging 
elif [ "$BRANCH" = "master" ] ; then
  yarn build:production 
else
  yarn build 
fi