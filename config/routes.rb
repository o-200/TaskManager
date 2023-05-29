Rails.application.routes.draw do
  root :to => "web/boards#show"

  resource :session, only: [:new, :create, :destroy]

  scope module: :web do
    resource :board, only: :show
    resource :session, only: :new
  end
end
