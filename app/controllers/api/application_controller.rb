class Api::ApplicationController < ActionController::Base
  include AuthHelper
  respond_to :json
end
