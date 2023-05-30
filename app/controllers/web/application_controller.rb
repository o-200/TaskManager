class Web::ApplicationController < ActionController::Base
  include Concerns::AuthHelper
  helper_method :current_user
end
