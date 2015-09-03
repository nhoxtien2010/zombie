class SupportsController < ApplicationController

  def create
    supports = []
    a= JSON.parse(params["supports"])
    hash = a.kind_of?(Array)? a : ([]<<a)
    hash.each do |item|
      support = Support.new
      support.name = item["name"]
      support.price = item["price"]
      support.attack = item["attack"]
      support.speed = item["speed"]
      support.defence = item["defence"]
      if item["cloth"] == true and @zombie.gold > support.price
          cloth = Cloth.new
          cloth.zombie = @zombie
          cloth.support = support
          support['cloth'] = true
          cloth.save

          @zombie.gold = @zombie.gold - item["price"].to_i
          @zombie.attack = @zombie.attack + item["attack"].to_i
          @zombie.speed = @zombie.speed + item["speed"].to_i
          @zombie.defence = @zombie.defence + item["defence"].to_i
          @zombie.save
      end

      support.save
      supports << support
    end
    render :json => {"success" => true, "message" => "Create all supports successfully!", "supports"=> supports}
  end

  def update
    a= JSON.parse(params["supports"])
    hash = a.kind_of?(Array)? a : ([]<<a)
    result = "Update "
    supports = []
    # save all hash is a array
    hash.each do |item|
      support = support.find(item["id"])
      result = result+ support.id.to_s + ", "
      support.name = item["name"] if item["name"]
      support.price = item["price"] if item["price"]
      support.attack = item["attack"] if item["attack"]
      support.speed = item["speed"] if item["speed"]
      support.defence = item["defence"] if item["defence"]


      if item["cloth"] == true
        price = support.price
        if @zombie.gold > price
          cloth = Cloth.new
          cloth.zombie = @zombie
          cloth.support = support
          cloth.save
          @zombie.gold = @zombie.gold - item["price"].to_i
          @zombie.attack = @zombie.attack + item["attack"].to_i
          @zombie.speed = @zombie.speed + item["speed"].to_i
          @zombie.defence = @zombie.defence + item["defence"].to_i
          @zombie.save
        end

      else item["cloth"] == false
          @zombie.attack = @zombie.attack - item["attack"].to_i
          @zombie.speed = @zombie.speed - item["speed"].to_i
          @zombie.defence = @zombie.defence + item["defence"].to_i
          @zombie.save
      end

      support['cloth'] = false
      support['cloth'] = true if @zombie.supports.include? support


      support.save
      supports << support
    end
    render :json => {"success" => true, "message"=> result, "supports" => supports}
  end

  def destroy
    if params["supports"].include? ","
      hash = JSON.parse(params["supports"])
    else
      hash = params["supports"].to_i.to_a
    end

    message = "Destroy supports: "
    hash.each do |id|
      Support.find(id).delete
      message = message + id.to_s+", "
    end
    render :json => {'success' => true, 'message' => message}

  end


  def get_index
    @zombie = Zombie.find(2)

    supports = Support.order(:id).offset(params[:start]).limit(params[:limit])
    zombie_supports = @zombie.supports
    total = Support.all.length

    result = []
    supports.each do |sp|
      rs = {
        'id'=> sp.id,
        'name'=> sp.name,
        'price' => sp.price,
        'attack'=>sp.attack,
        'speed'=>sp.speed,
        'defence'=> sp.defence
      }
      if zombie_supports.include?sp
        rs['cloth']=true
      else
        rs['cloth']=false
      end
      result << rs
    end


    respond_to do |format|
      format.json {render :json => {'supports' => result, 'total'=> total}}
    end

  end




  def get_zombie
    @zombie = Zombie.find(2)
  end


  def index
    @pages_number = Support.all.length/8
    @supports_number = params[:support_page].to_i||0
    sql = "select * from supports offset #{@supports_number * 8} limit 8"


    @supports = Support.find_by_sql(sql)
    @zombie_supports = @zombie.supports
    respond_to do |format|
      format.html
    end
  end

  def wear
    support = Support.find(params[:support_id])
    respond_to do |format|
      if @zombie.gold >= support.price
        cloth = Cloth.new
        cloth.zombie = @zombie
        cloth.support = support
        cloth.save

        @zombie.gold = @zombie.gold - support.price
        @zombie.attack = @zombie.attack + support.attack
        @zombie.speed = @zombie.speed + support.speed
        @zombie.defence = @zombie.defence + support.defence
        @zombie.save

        format.json{ render :json => {:success => true}}
      else

        format.json{ render :json => {:success => false}}


      end
    end
  end

  def unwear
    success = false
    support = Support.find(params[:support_id])
    cloth= Cloth.where(:support_id => params[:support_id], :zombie_id => @zombie.id).first
    success = true if cloth
    cloth.delete
    cloth.save

    @zombie.attack = @zombie.attack - support.attack
    @zombie.speed = @zombie.speed - support.speed
    @zombie.defence = @zombie.defence - support.defence
    @zombie.save

    respond_to do |format|
      format.json{render :json => {:success => success}}
    end

  end

end