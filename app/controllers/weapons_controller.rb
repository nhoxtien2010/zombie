class WeaponsController < ApplicationController
  before_filter :get_zombie


  def get_zombie
    @zombie = Zombie.find(session[:current_zombie])
  end

  def index
    @number_weapons = params[:weapon_page].to_i || 0
    sql = "select * from weapons offset #{@number_weapons * 8} limit 8"

    @weapons = Weapon.find_by_sql(sql)
    
    @zombie_weapons = @zombie.weapons
    @pages_number = Weapon.all.length/8 + 1

    respond_to do |format|
      format.html
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
    success = false
    weapon = Weapon.find(params[:weapon_id])
    eq= Equip.where(:weapon_id => params[:weapon_id], :zombie_id => @zombie.id).first
    success = true if eq
    eq.delete
    eq.save

    @zombie.attack = @zombie.attack - weapon.attack
    @zombie.speed = @zombie.speed - weapon.speed
    @zombie.save
    respond_to do |format|
      if success
        format.json {render :json =>{:success => true}}
      else
        format.json {render :json => {:success => false}}
      end
    end

  end
end
