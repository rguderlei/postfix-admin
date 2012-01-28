require 'sinatra'

# ROOT
get '/' do
	erb :index
end

# Page and Services for FORWARDINGS
get '/forwardings' do
	erb :'forwardings/index'
end

get '/forwardings', :provides=>'json' do
end

put '/forwardings' do
end

get  %r{/forwardings/([\w]+)}, :provides=>'json' do
end

put  %r{/forwardings/([\w]+)}, :provides=>'json' do
end

delete  %r{/forwardings/([\w]+)}, :provides=>'json' do
end

# Page and Services for MAILBOXES
get '/mailboxes' do
	erb :'mailboxes/index'
end

get '/mailboxes', :provides=>'json' do
end

put '/mailboxes' do
end

get  %r{/mailboxes/([\w]+)}, :provides=>'json' do
end

put  %r{/mailboxes/([\w]+)}, :provides=>'json' do
end

delete  %r{/mailboxes/([\w]+)}, :provides=>'json' do
end

