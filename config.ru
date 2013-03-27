require 'bundler/setup'
Bundler.require(:default)

require 'sinatra'
require 'sinatra/r18n'
require 'sequel'
require 'json'
require 'yaml'

require 'sprockets'
root = ::File.dirname(__FILE__)
require ::File.join( root, 'postfix_admin' )
set :root, ::File.join( root, 'app' )


map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'app/assets'
  environment.append_path 'test' if (PostfixAdmin.development? || PostfixAdmin.test?)
  run environment
end

run PostfixAdmin.new