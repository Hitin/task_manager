class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task.all
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])
      .includes(:author, :assignee)


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
    task = current_user.my_tasks.new(task_params)

    if task.save
      respond_with(task, location: nil)
    else
      render(json: { errors: task.errors.messages }, status: :unprocessable_entity)
    end
  end

  def update
    task = current_user.my_tasks.find(params[:id])
    #task = Task.find(params[:id])
    
    if task.update(task_params)
      render(json: task)
    else
      render(json: { errors: task.errors.messages }, status: :unprocessable_entity)
    end
  end

  def destroy
    task = current_user.my_tasks.find(params[:id])
      if task.destroy
        head(:ok)
      else
        render(json: { errors: task.errors.messages }, status: :unprocessable_entity)
      end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :assignee_id, :state_event, author_id: current_user.id)
  end
end