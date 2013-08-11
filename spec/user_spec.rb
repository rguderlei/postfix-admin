ENV['RACK_ENV'] = 'spec'

require 'rspec'
require 'rack/test'

require File.expand_path(File.dirname(__FILE__) + "/../postfix_admin")


describe 'The Posfix Admin' do
  include Rack::Test::Methods

  def app
    PostfixAdmin
  end

  it "holds a list of users" do
    get '/api/users'
    last_response.should be_ok
  end

  it "provides the details of a user"  do
    get '/api/users/foo'
    last_response.should be_ok
  end

end