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

  def create
    task = Task.new(task_params)

    if task.save
      respond_with(task, location: nil)
    else
      render(json: { errors: task.errors }, status: :unprocessable_entity)
    end
  end

  def update
    task = Task.find(params[:id])

    if task.update(task_params)
      render(json: task)
    else
      render(json: { errors: task.errors }, status: :unprocessable_entity)
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :author_id, :assignee_id, :state_event)
  end
end