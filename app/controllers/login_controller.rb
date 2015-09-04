class LoginController < ApplicationController

  def index
    session[:current_zombie] = nil
  end
  def login

    zombie = Zombie.where(:name => params[:name], :password => params[:password]).first
    respond_to do |format|
      if zombie
        session[:current_zombie] = zombie.id
        p session
        weapons = zombie.weapons
        format.json {render :json => {:success => true, :zombie => zombie}}
      else
        format.json {render :json => {:success => false}}
      end
    end
  end
end
