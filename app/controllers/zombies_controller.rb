class ZombiesController < ApplicationController

  require random_zombie


  def make_rooting
      self.rooting = true if age >20
  end

  def zombie_new
    @zombie = Zombie.new
    respond_to do |format|
      format.json {render :json => {"success"=> true} }
    end
  end

  # GET /zombies
  # GET /zombies.xml
  def index
    @zombies = Zombie.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @zombies }
      format.json { render :json => @zombies}
    end
  end

  # GET /zombies/1
  # GET /zombies/1.xml
  def show
    @zombie = Zombie.find(params[:id])

    respond_to do |format|
      format.html
      format.js
    end
  end

  def edit
    @zombie = Zombie.find(params[:id])
    respond_to do |format|
      format.js
    end
  end
  def create
    @zombie = Zombie.new(params[:zombie])
    respond_to do |format|
      if @zombie.save
        format.json {render :json => {'success' => true, 'zombie_id'=>  @zombie.id }}
      else
        format.json {render :json => {:errors => @zombie.errors.full_messages }}
      end
    end

  end

  def update
    @zombie = Zombie.find(params[:id])

    respond_to do |format|
      if @zombie.update_attributes(params[:zombie])
        format.js
        format.xml  { head :ok }
      else
        # format.html { render :action => "edit" }
        format.xml  { render :xml => @zombie.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /zombies/1
  # DELETE /zombies/1.xml
  def destroy
    @zombie = Zombie.find(params[:id])
    @zombie.destroy
    respond_to do |format|
      # format.html { redirect_to(tweets_url) }
      format.json  { head :ok }
      format.js
    end
  end


  def random_zombie(number)
    arr_zombie = ZombieGenerator.generate(number)
    arr_zombie.each do |zombie|
      zb = Zombie.new
      zb.name = zombie['name']
      zb.name = zombie['bio']
      zb.name = zombie['email']
      zb.name = zombie['name']
      zb.name = zombie['name']
      zb.name = zombie['name']
    end
  end
end
