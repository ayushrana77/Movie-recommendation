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
        with results,n,T,r
        match (Y:year{year:date(n.release_date).year})
        merge (n)-[x:year]->(Y)
        return n,T,Y,r,x
        '''
        map={"api":api}
        self.run_query(map)


    def front(self):
        self.que ='''
        match (n:MOVIE) return n
        '''
        map = {}
        return self.run_query(map)

 
    def get_id(self,id):
        self.que ='''
        match (n:MOVIE{id:$id}) return n
        '''
        map={"id":id}
        return self.run_query(map)


    def run_query(self,map):
        try:
            result=session.run(self.que,map)
            data = result.data()
            return (data)
        except Exception as e:
            return (str(e))



driver.close()