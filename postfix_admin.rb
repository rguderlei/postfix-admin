require 'sinatra'
require 'sequel'
require 'json'
# TODO config public directory

# TODO parse config.yml

DB = Sequel.connect(:adapter=>'mysql2', :host=>'localhost', :database=>'maildb', :user=>'mail', :password=>'mail')

# ROOT
get '/' do
	erb :index
end

# Page for FORWARDINGS
get '/forwardings' do
  render :forwardings
end

# Page for MAILBOXES
get '/forwardings' do
  render :mailboxes
end


# Services for FORWARDINGS
get '/forwardings', :provides=>'json' do
  return DB[:forwardings].all.to_json
end

post '/forwardings', :provides=>'json' do
  bodyParams = JSON.parse( request.body.read)
  source = params["source"].nil? ? bodyParams["source"]: params["source"]
  destination = params["destination"].nil? ? bodyParams["destination"]: params["destination"]

  DB[:forwardings].insert(:source => source, :destination => destination)
end

get  '/forwardings/:email', :provides=>'json' do |email|
  DB[:forwardings].filter(:source => email).first.to_json
end

post  '/forwardings/:email', :provides=>'json' do  |email|
  bodyParams = JSON.parse( request.body.read)
  destination = params["destination"].nil? ? bodyParams["destination"]: params["destination"]
  DB[:forwardings].filter(:source=>email).update(:destination => destination)
end

delete '/forwardings/:email', :provides=>'json' do  |email|
  DB[:forwardings].filter(:source => email).delete
end

# Services for MAILBOXES
# TODO : only email, no pwd over the wire
get '/mailboxes', :provides=>'json' do
  return DB[:users].all.to_json
end

post '/mailboxes', :provides=>'json' do
  bodyParams = JSON.parse( request.body.read)
  email = params["email"].nil? ? bodyParams["email"]: params["email"]
  password = params["password"].nil? ? bodyParams["password"]: params["password"]
  password_confirmation = params["password_confirmation"].nil? ? bodyParams["password_confirmation"]: params["password_confirmation"]

  if password.eql?(password_confirmation) then
    DB[:users].insert(:email => email, :password => destination)
  end
end

get  '/mailboxes/:user', :provides=>'json' do |user|
  DB[:users].filter(:email => user).first.to_json
end

post  '/mailboxes/:user', :provides=>'json' do |user|
  bodyParams = JSON.parse( request.body.read)
  destination = params["destination"].nil? ? bodyParams["destination"]: params["destination"]
  DB[:users].filter(:email=>user).update(:destination => destination)
end

delete  '/mailboxes/:user', :provides=>'json' do |user|
  DB[:users].filter(:email => user).delete
end

