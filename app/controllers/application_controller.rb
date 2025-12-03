class ApplicationController < ActionController::Base
  # TODO: implement csrf
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
end
