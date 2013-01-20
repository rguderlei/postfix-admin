require "bundler/setup"
Bundler.require(:default)

require 'sinatra'
require 'sinatra/r18n'
require 'sequel'
require 'json'
require 'yaml'

require 'sprockets'
require File.expand_path('../app', __FILE__)

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'app/assets'
  environment.append_path 'test' if (App.development? || App.test?)
  run environment
end

run App
