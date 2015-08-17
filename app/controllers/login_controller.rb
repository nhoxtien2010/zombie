class LoginController < ApplicationController
  def index
    
  end

  def login
    zombie = Zombie.where(:name => params[:login]['name'], :password => params[:login]['pass'])
    respond_to do |format|
      if zombie.length != 0
        format.json {render :json => {:success => true}}
      else
        format.json {render :json => {:success => false}}
      end
    end
  end
end
