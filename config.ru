# TODO rackup & bundler??
require 'rubygems'
root = ::File.dirname(__FILE__)
require ::File.join( root, 'postfix_admin' )
set :environment, :production
run PostfixAdmin.new