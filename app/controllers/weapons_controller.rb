class WeaponsController < ApplicationController

  before_filter :get_zombie

  def get_zombie
    @zombie = session[:current_zombie]
  end

  def index
    @weapons = Weapon.all

    respond_to do |format|
      format.html
      format.js
    end


  end

  def buy
    weapon = Weapon.find(params[:weapon_id])
    weapon.zombie = @zombie
    respond_to do |format|
      format.json {render :jsson =>{:success => true} }
    end

  end

  def unequip
    weapon = Weapon.find(params[:weapon_id])
    weapon.zombie = @zombie
    respond_to do |format|
      format.json {render :jsson =>{:success => true} }
    end

  end
  
end
