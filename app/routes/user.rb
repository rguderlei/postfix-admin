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
    password = params["password"].nil? ? bodyParams["password"] : params["password"]
    password_confirmation = params["password_confirmation"].nil? ? bodyParams["password_confirmation"] : params["password_confirmation"]

    if password.eql?(password_confirmation) then
      if DB[:users].filter(:email => email).empty?
        DB[:users].insert(:email => email, :password => Sequel.function(:ENCRYPT,password))
        DB[:users].filter(:email => email).first.to_json(:root=>true)
      else
        status 400
        body "user already exists"    #TODO i18n
      end
    else
      status 400
      body "password and confirmation do not match"  #TODO i18n
    end
  end

  get '/api/users/:user', :provides => 'json' do |user|
    User.filter(:email => user).first.to_json(:root => true)
  end

  post '/api/users/:user', :provides => 'json' do |user|
    bodyParams = JSON.parse(request.body.read)
    old_password = params["old_password"].nil? ? bodyParams["old_password"] : params["old_password"]
    password = params["password"].nil? ? bodyParams["password"] : params["password"]
    password_confirmation = params["password_confirmation"].nil? ? bodyParams["password_confirmation"] : params["password_confirmation"]
    if password.eql?(password_confirmation)
      user = User.first(:email=>user, :password => Sequel.function(:ENCRYPT, old_password, :password))
      if !user.nil?
        user.password = Sequel.function(:ENCRYPT, password)
        user.save
        200
      else
        status 400
        body "old password is wrong"   #TODO i18n
      end
    else
      status 400
      body "password and confirmation do not match"  #TODO i18n
    end

  end

  delete '/api/users/:user', :provides => 'json' do |user|
    DB[:users].filter(:email => user).delete
    200
  end
end