class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    users = User.ransack(ransack_params)
                .result
                .page(page)
                .per(per_page)

    respond_with(users, each_serializer: UserSerializer, root: 'items', meta: build_meta(users))
  end

  def show
    user = User.find(params[:id])

    respond_with(user, serializer: UserSerializer)
  end
end
