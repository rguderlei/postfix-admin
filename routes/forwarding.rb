class PostfixAdmin < Sinatra::Application
   # Page for FORWARDINGS
   get '/forwardings', :provides => 'html' do
     @forwardings = Forwarding.all
     erb :forwardings
   end




   # Services for FORWARDINGS
   get '/api/forwardings', :provides=>'json' do
     return {:forwardings => Forwarding.all()}.to_json
   end

   post '/api/forwardings', :provides=>'json' do
     bodyParams = JSON.parse( request.body.read)
     source = params["source"].nil? ? bodyParams["source"]: params["source"]
     destination = params["destination"].nil? ? bodyParams["destination"]: params["destination"]

     DB[:forwardings].insert(:source => source, :destination => destination)
   end

   get  '/api/forwardings/:email', :provides=>'json' do |email|
     Forwarding.filter(:source => email).first.to_json(:root=>true)
   end

   post  '/api/forwardings/:email', :provides=>'json' do  |email|
     bodyParams = JSON.parse( request.body.read)
     destination = params["destination"].nil? ? bodyParams["destination"]: params["destination"]
     DB[:forwardings].filter(:source=>email).update(:destination => destination)
   end

   delete '/api/forwardings/:email', :provides=>'json' do  |email|
     DB[:forwardings].filter(:source => email).delete
   end

end