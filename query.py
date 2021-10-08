from neo4j import GraphDatabase

with open("apikey.txt") as f1:
    apikey = f1.read()


with open("database_cred.txt") as f:
    data= f.read().split(',')
    username=data[0]
    pwd=data[1]
    url=data[2]

driver = GraphDatabase.driver(uri=url,auth=(username,pwd))
session = driver.session()
api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + apikey


class qu:

    def __init__(self):
        que = ''''''

    def add(self): 
        self.que ='''
        call apoc.load.json($api)
       yield value
        unwind value.results as results
        merge (n:MOVIE{id:results.id}) set n = results {.*,NAME:results.title}
        with results,n
        unwind results.genre_ids as genre
        match (T:GENRES {id:genre})
        merge (n)-[r:has]->(T)
        return T,r
        '''
        self.run_query()


    def front(self):
        self.que ='''
        match (n:MOVIE) return n
        '''
        return self.run_query()

 
    def run_query(self):
        map={"api":api}
        try:
            result=session.run(self.que,map)
            data = result.data()
            return (data)
        except Exception as e:
            return (str(e))



driver.close()




# genres add command
# call apoc.load.json("https://api.themoviedb.org/3/genre/movie/list?api_key=0b49362fb609e87f25368bd27624b3eb&language=en-US")
# yield value
# unwind value.genres as genres
# merge (n:GENRES {id:genres.id,name:genres.name})
# return n



# add
# call apoc.load.json("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0b49362fb609e87f25368bd27624b3eb")
#         yield value
#         unwind value.results as results
#         merge (n:MOVIE{id:results.id}) set n = results {.*,NAME:results.title}
#         with results,n
#         unwind results.genre_ids as genre
#         match (T:GENRES {id:genre})
#         merge (n)-[r:has]->(T)
#         return T,r