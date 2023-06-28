# Nextjs OpenJira App

To deploy locally, it requires a database
```
docker-compose up -d
```

* -d means __detached__ so you won't have a terminal running, it will work in the background

* MongoDB Local URL:
```
mongodb://localhost:27017/tasks
```

## Configure environment variables
Rename the file __.env.template__ to __.env__ and fill the respective values

## Add some test data to the database
Use __npx ts-node seed.ts__ or:
```
http://localhost:3000/api/seed
```