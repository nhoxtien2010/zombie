class WeaponsController < ApplicationController

  def get_zombie
    @zombie = Zombie.find(session[:current_zombie])
  end

  def index
  end

  def data
    render :json => { "data" => {"title" => "abc"}}
  end

  def get_index
    @zombie =Zombie.find(1)
    weapons = Weapon.all
    zombie_weapons = @zombie.weapons
    pages_number = Weapon.all.length/8

    result = []
    p weapons
    weapons.each do |wp|
      name = wp.weapon_type ? wp.weapon_type.name : ""
      rs = {'id'=> wp.id,
      'name'=> wp.name,
      'price' => wp.price,
      'attack'=>wp.attack,
      'speed'=>wp.speed,
      'range'=> wp.range,
      'weapon_type'=> name}
      if zombie_weapons.include?wp
        rs['equip']=true
      else
        rs['equip']=false
      end
      result<< rs

    end

    respond_to do |format|
      format.json {render :json => {"weapons" => result}}
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
