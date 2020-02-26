class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    users = User.all
      .ransack(q_params)
      .result

    json = {
      items: users.map { |u| UserSerializer.new(u).as_json },
      meta: build_meta_users(users)
    }

    respond_with json
  end

  def show
    user = User.find(params[:id])
    respond_with(user)
  end

end
