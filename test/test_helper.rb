require 'simplecov'
require 'coveralls'
ENV['RAILS_ENV'] ||= 'test'
SimpleCov.start 
Coveralls.wear!('rails')
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
end
