class PostfixAdmin < Sinatra::Application
  enable :sessions
  set :session_secret, '*&(^B234'

  get '/' do
  	erb :index
  end
end