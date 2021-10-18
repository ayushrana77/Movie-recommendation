from neo4j import GraphDatabase
from datetime import date

with open("apikey.txt") as f1:
    apikey = f1.read()


with open("database_cred.txt") as f:
    data= f.read().split(',')
    username=data[0]
    pwd=data[1]
    url=data[2]

driver = GraphDatabase.driver(uri=url,auth=(username,pwd))
session = driver.session()
api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +apikey+"page=1"

today_date = date.today()

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
        MATCH (n:MOVIE)
        where date({year: $year1, month: $mu1}) > date(n.release_date) >= date({year: $year2, month: $mu2})
        RETURN n 
        order by
        n.popularity DESC limit 20
        '''
        year1 = today_date.year
        mu1 = today_date.month
        if(mu1 <= 4):
            year2 = year1-1
            mu2 = 8+mu1
        else:
            year2 = year1
            mu2 = mu1-4

        map = {"year1":year1,"year2":year2,"mu1":mu1,"mu2":mu2}
        return self.run_query(map)

 
    def get_Movie_id(self,id):
        self.que ='''
        match (n:MOVIE{id:$id}) return n
        '''
        map={"id":id}
        return self.run_query(map)

    def get_genres_id(self,id):
        self.que ='''
        MATCH (n:GENRES{id:$id}) RETURN n
        '''
        map={"id":id}
        return self.run_query(map)

    def get_rem(self,id):
        self.que ='''
        MATCH (n:GENRES)
        WHERE (n.id) IN $id
        with n
        MATCH p=(n:GENRES)<-[r:has]-(c:MOVIE)
        RETURN c,count(r) AS connections 
        ORDER BY connections DESC,c.popularity DESC limit 20
        '''
        map={"id":id}
        return self.run_query(map)

    def get_category_id(self,id):
        self.que ='''
        MATCH p=(m:MOVIE)-[r:has]->(n:GENRES{id:$id}) RETURN m
        ORDER BY m.popularity DESC limit 20
        '''
        map={"id":id}
        return self.run_query(map)


    def genre(self):
        self.que='''
        MATCH (n:GENRES) RETURN n
        '''
        map = {}
        return self.run_query(map)

    def get_by_year(self,year):
        self.que ='''
        MATCH p=(m:MOVIE)-->(y:year{year:$year})
        return m ORDER BY m.popularity DESC limit 20
        '''
        map={"year":year}
        return self.run_query(map)

    def get_by_search(self,search):
        self.que ='''
        match (m:MOVIE)
        where m.NAME =~ $sre
        return m ORDER BY m.popularity DESC limit 20
        '''
        sre = "(?i)"+search+".*"
        map={"sre":sre}
        return self.run_query(map)

    def run_query(self,map):
        try:
            result=session.run(self.que,map)
            data = result.data()
            return (data)
        except Exception as e:
            return (str(e))



driver.close()