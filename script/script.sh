#echo "--------------- CREATING/SETUP DATABASE"

#mongo --eval "use saude-em-casa"
#mongo --eval "db.dropDatabase()"
#mongo --eval "use saude-em-casa"
#mongo --eval "db.createCollection('habilitados')"
#mongo --eval "db.createCollection('farmacia_popular_conveniada')"
#mongo --eval "db.createCollection('farmacia_popular')"

#echo "--------------- STARTING DOWNLOAD"

#wget -O ../data/estabelecimentos_habilitados.json http://goo.gl/7mEp78
#wget -O ../data/estabelecimentos_farmacia_popular.json http://goo.gl/Jj6kIy
#wget -O ../data/farmacia_popular_br.json http://goo.gl/uPEBTt

#echo "--------------- IMPORTING DATA TO DATABASE"

#mongoimport --db saude-em-casa --collection habilitados --type json --file ../data/processed_estabelecimentos_habilitados.json --jsonArray
#mongoimport --db saude-em-casa --collection farmacia_popular_conveniada --type json --file ../data/processed_estabelecimentos_farmacia_popular.json --jsonArray
#mongoimport --db saude-em-casa --collection farmacia_popular --type json --file ../data/processed_farmacia_popular_br.json --jsonArray

#echo "--------------- FINISH PROCESS & STARTING METEOR w MONGO!!"

MONGO_URL=mongodb://localhost:27017/saude-em-casa meteor run
