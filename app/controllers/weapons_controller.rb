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


# buy weapon for zombie
  def buy
    weapon = Weapon.find(params[:weapon_id])
    respond_to do |format|
      if @zombie.gold >= weapon.price
        equip = Equip.new
        equip.zombie = @zombie
        equip.weapon = weapon
        equip.save

        @zombie.gold = @zombie.gold - weapon.price
        @zombie.attack = @zombie.attack + weapon.attack
        @zombie.speed = @zombie.speed + weapon.speed
        @zombie.save

        format.json{ render :json => {:success => true}}
      else

        format.json{ render :json => {:success => false, :weapon => weapon, :zombie => @zombie}}


      end
    end
  end

  def unequip
    weapon = Weapon.find(params[:weapon_id])
    eq= Equip.where(:weapon_id => params[:weapon_id], :zombie_id => @zombie.id).first
    eq.delete
    eq.save

    @zombie.attack = @zombie.attack - weapon.attack
    @zombie.speed = @zombie.speed - weapon.speed
    @zombie.save
    respond_to do |format|
      if eq
        format.json {render :json =>{:success => true}}
      else
        format.json {render :json => {:success => false}}
      end
    end

  end
end
