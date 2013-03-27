require 'sequel'

config = YAML.load_file('conf/config.yml')

    database_host = config['database']['host']
    database_name = config['database']['name']
    database_user = config['database']['user']
    database_password = config['database']['password']


DB = Sequel.connect(:adapter=>'mysql2', :host=> database_host , :database=>database_name,
                    :user=>database_user, :password=>database_password)
Sequel::Model.plugin :json_serializer

require_relative 'user'
require_relative 'forwarding'