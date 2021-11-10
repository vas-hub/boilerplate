#/bin/sh
echo "starting with: "$ENV

if [ "$ENV" = "staging" ] ; then
  yarn start:staging
elif [ "$ENV" = "production" ] ; then
  yarn start:production
else
  yarn start
fi
