class PostfixAdmin < Sinatra::Application
  get '/' do
  	erb :index
  end
end