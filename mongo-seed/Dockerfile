FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db admin --collection Person --type json --file /init.json --jsonArray
