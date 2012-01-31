# TODO rackup & bundler??
require 'rubygems'
require 'postfix_admin'
set :run, false
set :environment, :production
run Sinatra::Application