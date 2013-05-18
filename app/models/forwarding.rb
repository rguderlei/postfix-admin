Sequel::Model.plugin :validation_helpers

class Forwarding < Sequel::Model
  plugin  :json_serializer

  unrestrict_primary_key
  set_allowed_columns :source, :destination
  def validate
    email_format = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates_format email_format, :source
    destination.split(",").each{ |dest|
      errors.add(:destination, "not an email") unless  email_format =~ dest
    }
  end
end