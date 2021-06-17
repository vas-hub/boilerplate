#/bin/sh
echo "starting with: "$ENV

ls node_modules/next/
echo "-----------"

if [ "$ENV" = "staging" ] ; then
  yarn start:staging
elif [ "$ENV" = "production" ] ; then
  yarn start:production
else
  yarn start
fi
