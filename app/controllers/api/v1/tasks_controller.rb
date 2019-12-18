class Api::V1::TasksController < Api::V1::ApplicationController
  respond_to :html, :json

  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task.all
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])

    json = {
        items: tasks.map { |t| TaskSerializer.new(t).as_json },
        meta: build_meta_tasks(tasks)
    }

    respond_with json
  end

  def show
    task = Task.find(params[:id])
    respond_with(task)
  end
end