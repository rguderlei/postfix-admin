require 'sinatra'
require 'sinatra/r18n'

require 'json'
require 'yaml'

class PostfixAdmin < Sinatra::Application
  enable :sessions

  configure do
    config = YAML.load_file('conf/config.yml')

    set :database_host => config['database']['host']
    set :database_name => config['database']['name']
    set :database_user => config['database']['user']
    set :database_password => config['database']['password']

    set :admin_name =>  config['auth']['username']
    set :admin_password => config['auth']['password']
  end

  helpers do
    include Rack::Utils
    alias_method :h, :escape_html

    def protected!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Testing HTTP Auth")
        throw(:halt, [401, "Not authorized\n"])
      end
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == [settings.admin_name, settings.admin_password]
    end
  end

  before do
    session[:locale] = params[:locale] if params[:locale]
    protected! unless request.path_info == "/"
  end

end

require_relative 'models/init'
#require_relative 'helpers/init'
require_relative 'routes/init'
