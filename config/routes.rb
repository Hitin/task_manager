Rails.application.routes.draw do
  root :to => "web/board#show"

  scope module: :web do
    resource :board, only: :show
    resource :session, only: :new
    resources :developers, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy]
  end


end
