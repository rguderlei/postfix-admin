class PostfixAdmin < Sinatra::Application
  # Page for MAILBOXES
  get '/mailboxes', :provides => 'html' do
    @users = User.all()
    erb :mailboxes
  end

  # Services for MAILBOXES
  get '/api/users', :provides => 'json' do
    return {:users => User.all()}.to_json
  end

  post '/api/users', :provides => 'json' do
    bodyParams = JSON.parse(request.body.read)
    email = params["email"].nil? ? bodyParams["email"] : params["email"]
    old_password = params["old_password"].nil? ? bodyParams["old_password"] : params["old_password"]
    password = params["password"].nil? ? bodyParams["password"] : params["password"]
    password_confirmation = params["password_confirmation"].nil? ? bodyParams["password_confirmation"] : params["password_confirmation"]

    if password.eql?(password_confirmation) then
      if DB[:users].filter(:email => email).empty?
        DB[:users].insert(:email => email, :password => :Encrypt.sql_function(password))
      else
        DB[:users].filter(:email => user).update(:password => :Encrypt.sql_function(password)) unless DB[:users].filter(:email => email, :password => :Encrypt.sql_function(password)).empty?
      end
      DB[:users].filter(:email => email).first.to_json(:root=>true)
    else
      400
    end
  end

  get '/api/users/:user', :provides => 'json' do |user|
    User.filter(:email => user).first.to_json(:root => true)
  end

  post '/api/users/:user', :provides => 'json' do |user|
    bodyParams = JSON.parse(request.body.read)
    password = params["password"].nil? ? bodyParams["password"] : params["password"]
    password_confirmation = params["password_confirmation"].nil? ? bodyParams["password_confirmation"] : params["password_confirmation"]
    if password.eql?(password_confirmation) then
      DB[:users].filter(:email => user).update(:password => :Encrypt.sql_function(password))
    end
    200
  end

  delete '/api/users/:user', :provides => 'json' do |user|
    DB[:users].filter(:email => user).delete
    200
  end
end